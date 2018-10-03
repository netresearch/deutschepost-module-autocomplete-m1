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
     * @param {Object} fields
     * @param {Object} suggestions
     * @param {String} divider
     */
    initialize: function(fields, suggestions, divider) {
        this.suggestionModel = suggestions;
        this.fields          = fields;
        this.fieldNames      = fields.getNames();
        this.divider         = divider;
    },

    /**
     * Renders data list as ul
     *
     * @param {HTMLElement} $currentField
     */
    render: function ($currentField) {
        var self = this,
            suggestions = this.suggestionModel.getAddressSuggestions(),
            $currentDataList = $currentField.datalist;

        if ($currentDataList) {
            $currentDataList.remove();
        }
        var $dataList = new Element('ul', {
            'id': 'datalist-' + $currentField.id,
            'class' : 'datalist',
            'style' : 'width:'+ $currentField.offsetWidth +'px'
        });

        suggestions.each(function(suggestionItem) {
            var $dataListOption  = new Element('li', {
                'id': suggestionItem.uuid
            }),
                addressDataArray = [];

            // Combine all address items to suggestion string, divided by divider
            self.fieldNames.each(function(fieldName) {
                if (suggestionItem[fieldName] && suggestionItem[fieldName].length) {
                    addressDataArray.push(suggestionItem[fieldName]);
                }
            });

            var addressData = addressDataArray.join(self.divider);
            // Print suggestions's items to datalist option, separated by divider
            $dataListOption.update(addressData);
            $dataListOption.setAttribute('data-value', addressData);

            $dataList.insert({
                bottom: $dataListOption
            });
        });

        $currentField.setAttribute('list', 'datalist-' + $currentField.id);
        $currentField.insert({
            after: $dataList
        });
        $currentField.datalist = $dataList;

        $dataList.observe('mousedown', function (e) {
            self.itemSelect(e.target, $currentField);
            Event.fire($currentField, 'autocomplete:datalist-select');
            this.remove();
        });

    },

    itemSelect: function (item, field) {
        field.value = item.dataset.value;
    },
};
