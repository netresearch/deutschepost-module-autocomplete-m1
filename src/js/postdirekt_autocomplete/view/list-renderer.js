"use strict";

var ListRenderer = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
ListRenderer.prototype = {
    field: null,
    currentDataList: null,

    /**
     *
     * @param {Array} fieldNames
     * @param {Array} suggestions
     * @param {String} divider
     */
    initialize: function(fieldNames, suggestions, divider) {
        this.suggestions = suggestions;
        this.fieldNames = fieldNames;
        this.divider = divider;
        this.field = false;
    },

    /**
     * Renders data list as ul
     *
     * @param {HTMLElement} $currentField
     */
    render: function ($currentField) {
        var self = this;

        this.field           = $currentField;
        var $currentDataList = $currentField.datalist;

        if ($currentDataList) {
            $currentDataList.remove();
        }
        var $dataList = new Element('ul', {
            'id': 'datalist-' + this.field.id,
            'class' : 'datalist',
            'style' : 'width:'+ this.field.offsetWidth +'px'
        });

        for (var i = 0; i < this.suggestions.data.length; ++i) {
            var $dataListOption  = new Element('li', {
                    'id': this.suggestions.data[i].uuid
                }),
                addressData = '',
                initLoop = false;

            // Combine all address items to suggestion string, divided by divider
            for (var fieldName in this.fieldNames) {
                if (this.suggestions.data[i][fieldName]) {
                    // Add divider in front of all items but first
                    if (!initLoop) {
                        initLoop = true;
                    } else {
                        addressData += this.divider;
                    }
                    addressData += this.suggestions.data[i][fieldName];
                }
            }

            $dataListOption.update(addressData);
            $dataListOption.setAttribute('data-value', addressData);

            $dataList.insert({
                bottom: $dataListOption
            });
        }



        this.field.setAttribute('list', 'datalist-' + this.field.id);
        this.field.insert({
            after: $dataList
        });
        this.field.datalist = $dataList;

        $dataList.observe('mousedown', function (e) {
            self.itemSelect(e.target);
            Event.fire(self.field, 'autocomplete:datalist-select');
            this.remove();
        });

    },

    itemSelect: function (item) {
        this.field.value = item.dataset.value;
    },
};
