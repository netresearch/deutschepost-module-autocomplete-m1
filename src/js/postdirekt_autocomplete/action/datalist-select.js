"use strict";

var DatalistSelect = Class.create();

/**
 * Resource model for DatalistSelect objects.
 *
 * @type {{}}
 */
DatalistSelect.prototype = {

    /**
     * Initialize.
     *
     * @param {HTMLElement} $currentField
     * @param {HTMLElement} $currentForm
     * @param {Object} observedFields
     * @param {Object} suggestionModel
     *
     * @constructor
     */
    initialize: function($currentField, $currentForm, observedFields, suggestionModel) {
        this.field = $currentField;
        this.value = $currentField.value;
        this.form = $currentForm;
        this.fields = observedFields;
        this.suggestions = suggestionModel;
        this.option = this.field.next('datalist').down("[value='" + this.value + "']");
        this.currentSuggestionObject = false;

        var optionId = this.option.identify();

        if (optionId) {
            this.currentSuggestionObject = this.suggestions.filter(function (item) {
                return item.uuid === optionId;
            });
        }
    },

    /**
     * Updates all observed fields.
     *
     */
    updateFields: function () {

        // Fill all fields with response values
        for (var field in this.fields) {

            // Get data selector with address item
            var selector         = '[data-address-item="' + field + '"]',
                addressFieldById = this.form.select(selector),
                item             = this.fields[field].name;

            if (addressFieldById && this.currentSuggestionObject[0][item]) {
                addressFieldById[0].value = this.currentSuggestionObject[0][item];
            }
        }
    }
};
