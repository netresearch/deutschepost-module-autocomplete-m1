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
     */
    render: function (suggestions) {
        if (this.currentDataList) {
            this.currentDataList.remove();
        }

        var $dataList = new Element('datalist', {
            'id': 'datalist-' + this.field.id,
        });

        for (var i = 0; i < suggestions.length; ++i) {
            var $dataListOption  = new Element('option', {
                'id': suggestions[i].uuid
            });

            var addressData = suggestions[i].street + ', '
                + suggestions[i].postcode + ', '
                + suggestions[i].city;

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
