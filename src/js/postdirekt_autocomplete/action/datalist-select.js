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
     * @param {HTMLElement} $currentForm
     * @param {Object} observedFields
     * @param {Object} suggestionModel
     *
     * @constructor
     */
    initialize: function($currentForm, observedFields, suggestionModel) {
        this.form = $currentForm;
        this.fields = observedFields;
        this.suggestionModel = suggestionModel;
    },

    /**
     * Updates all observed fields.
     *
     * @param {HTMLElement} $currentField
     *
     */
    updateFields: function ($currentField) {
        var fieldValue = $currentField.value,
            suggestions = this.suggestionModel,
            option = $currentField.next('datalist').down("[value='" + fieldValue + "']"),
            optionId = option.identify(),
            currentSuggestionObject;

        if (optionId) {
            currentSuggestionObject = suggestions.getByUuid(optionId);
        }

        if (currentSuggestionObject && currentSuggestionObject.length) {
            // Fill all fields with response values
            for (var field in this.fields) {
                // Get data selector with address item
                var selector         = '[data-address-item="' + field + '"]',
                    addressFieldById = this.form.select(selector),
                    item             = this.fields[field].name;

                if (addressFieldById && currentSuggestionObject[0][item]) {
                    addressFieldById[0].value = currentSuggestionObject[0][item];
                }
            }
        }
    }
};
