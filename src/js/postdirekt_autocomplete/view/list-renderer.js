"use strict";

var ListRenderer = Class.create();

/**
 * Resource model for AddressAutocomplete ul objects
 *
 * @type {{}}
 */
ListRenderer.prototype = {
    field: null,
    currentDataList: null,

    /**
     *
     * @param {Object} fields
     * @param {Object} suggestions
     * @param {String} divider
     */
    initialize: function(fields, suggestions, divider) {
        this.suggestionModel = suggestions;
        this.fields          = fields;
        this.fieldNames      = fields.getNames();
        this.divider         = divider;
        // prevent timing problems
        this.addFieldKeyListener();
    },

    /**
     * Renders data list as ul
     *
     * @param {HTMLElement} $currentField
     */
    render: function ($currentField) {
        var self = this,
            suggestionOptions = this.suggestionModel.getAddressSuggestionOptions(self.fieldNames, self.divider, 'li'),
            fieldId          = $currentField.id,
            $currentDataList = $('datalist-' + fieldId);

        if ($currentDataList) {
            $currentDataList.remove();
        }
        var $dataList = new Element('ul', {
            'id': 'datalist-' + $currentField.id,
            'class' : 'datalist',
            'style' : 'width:'+ $currentField.offsetWidth +'px'
        });

        if (suggestionOptions.length > 0) {
            suggestionOptions.each(function ($dataListOption) {
                $dataList.insert({
                    bottom: $dataListOption
                });
            });
        }

        $currentField.setAttribute('list', 'datalist-' + $currentField.id);
        $currentField.insert({
            after: $dataList
        });

        $dataList.observe('mousedown', function (e) {
            self.itemSelect(e.target, $currentField, this);
        });

    },

    /**
     * Set field value from selected li
     *
     * @param {Object} item
     * @param {HTMLElement} field
     * @param {HTMLElement} dataList
     */
    itemSelect: function (item, field, dataList) {
        field.value = item.dataset.value;
        Event.fire($(field), 'autocomplete:datalist-select');
        dataList.remove();
    },

    /**
     * Keynavigation for ul
     *
     * @param {HTMLElement} $field
     * @param {boolean} isDown
     * @param {boolean} isUp
     * @param {boolean} isEnter
     * @param {boolean} isTab
     */
    triggerKeydown: function ($field, isDown, isUp, isEnter, isTab) {
        var fieldId = $field.id,
            dataList    = $('datalist-' + fieldId),
            dataOptions = null;

        if(!dataList) {
            return;
        }

        if (isTab) {
            dataList.hide();
        }

        dataOptions = dataList.childElements();
        var activeItem = dataList.down('[data-active]'),
            firstItem = dataOptions[0];

        if (!activeItem && isEnter) {
            return;
        }

        if (isDown && !activeItem) {
            firstItem.setAttribute('data-active', 'true');
        } else if (activeItem) {
            var prevVisible = null;
            var nextVisible = null;

            for( var i = 0; i < dataOptions.length; i++ ) {
                var visItem = dataOptions[i];
                if( visItem === activeItem ) {
                    prevVisible = dataOptions[i-1];
                    nextVisible = dataOptions[i+1];
                    break;
                }
            }
            activeItem.removeAttribute('data-active');

            if (isUp) {
                if (prevVisible) {
                    prevVisible.setAttribute('data-active', 'true');
                    if ( prevVisible.offsetTop < dataList.scrollTop ) {
                        dataList.scrollTop -= prevVisible.offsetHeight;
                    }
                } else {
                    dataOptions[dataOptions.length - 1].setAttribute('data-active', 'true');
                }
            }
            if (isDown) {
                if (nextVisible) {
                    nextVisible.setAttribute('data-active', 'true');
                } else {
                    dataOptions[0].setAttribute('data-active', 'true');
                }
            }

            if (isEnter) {
                this.itemSelect(activeItem, $field, dataList);
            }
        }
    },
    /**
     * Add listener to observe address fields
     */
    addFieldKeyListener: function () {
        var self = this;

        self.fields.getIds().each(function(fieldId) {
            var fieldItem = self.fields.getFieldById(fieldId);

            // Set field name as data attribute to prevent problems with colon selectors
            fieldItem.setAttribute('data-address-item', fieldId);
            fieldItem
                .observe('keydown', function (e) {
                    var isUp = e.keyCode === 38,
                        isDown = e.keyCode === 40,
                        isEnter = e.keyCode === 13,
                        isTab = e.keyCode === 9;
                    if (isUp || isDown || isEnter || isTab) {
                        self.triggerKeydown(e.target, isDown, isUp, isEnter, isTab);
                    }
                });

        });
    },

    /**
     *
     * @param {HTMLElement} $currentField
     * @return {String}
     */
    getSuggestionUuid: function ($currentField) {
        var fieldValue  = $currentField.value,
            option      = $currentField.next('ul').down("[data-value='" + fieldValue + "']"),
            optionId    =  option.identify();
        return optionId;
    }
};
