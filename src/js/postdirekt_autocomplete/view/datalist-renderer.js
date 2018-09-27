"use strict";

var DataListRenderer = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
DataListRenderer.prototype = {

    /**
     *
     * @param {Array} fieldNames
     * @param {Array} suggestions
     * @param {String} divider
     *
     * @constructor
     */
    initialize: function(fieldNames, suggestions, divider) {
        this.suggestions = suggestions;
        this.fieldNames = fieldNames;
        this.divider = divider;
        this.field = false;
    },

    /**
     * Renders the datalist.
     *
     * @param {HTMLElement} $currentField
     *
     */
    render: function ($currentField) {
        this.field = $currentField;
        var $currentDataList = $('datalist-' + this.field.id);

        if ($currentDataList) {
            $currentDataList.remove();
        }

        var $dataList = new Element('datalist', {
            'id': 'datalist-' + this.field.id
        });

        for (var i = 0; i < this.suggestions.data.length; ++i) {

            var $dataListOption  = new Element('option', {
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

            $dataListOption.value = addressData;
            $dataList.insert({
                bottom: $dataListOption
            });
        }

        this.field.setAttribute('list', 'datalist-' + this.field.id);
        this.field.insert({
            after: $dataList
        });
    }
};
