"use strict";

var DataListRenderer = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
DataListRenderer.prototype = {
    field: null,
    currentDataList: null,

    /**
     * @constructor
     */
    initialize: function(field, suggestions) {
        this.field           = field;
        this.currentDataList = $('datalist-' + this.field.id);
    },

    /**
     * Renders the datalist.
     *
     * @param {Array} suggestions
     * @param {Array} fieldNames
     * @param {String} divider
     */
    render: function (suggestions, fieldNames, divider) {
        if (this.currentDataList) {
            this.currentDataList.remove();
        }

        var $dataList = new Element('datalist', {
            'id': 'datalist-' + this.field.id,
        });


        for (var i = 0; i < suggestions.length; ++i) {
            var $dataListOption  = new Element('option', {
                    'id': suggestions[i].uuid
                }),
                addressData = '',
                initLoop = false;

            // Combine all address items to suggestion string, divided by divider
            for (var fieldName in fieldNames) {

                if (suggestions[i][fieldName]) {
                    // Add divider in front of all items but first
                    if (!initLoop) {
                        initLoop = true;
                    } else {
                        addressData += divider;
                    }
                    addressData += suggestions[i][fieldName];
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
