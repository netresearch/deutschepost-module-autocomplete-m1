"use strict";

var FieldInput = Class.create();

/**
 * Resource model for SelectRequest objects.
 *
 * @type {{}}
 */
FieldInput.prototype = {

    /**
     * Initialize.
     *
     * @constructor
     */
    initialize: function(allFields, addressData, searchRequest) {
        this.allFields     = allFields;
        this.addressData   = addressData;
        this.searchRequest = searchRequest;
    },

    /**
     * doInputAction
     *
     * @param {Object}   selectFields
     * @param {Function} callback
     */
    doInputAction: function($currentField) {
        var fieldId = $currentField.identify(),
            item    = this.allFields[fieldId];

        this.addressData.setDataValue(item.name, item.field.value);
    }
};
