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
        this.currentSuggestionObject = false;
    },

    /**
     * Updates all observed fields.
     *
     * @param {HTMLElement} $currentField
     *
     */
    updateFields: function ($currentField) {
        var fieldValue = $currentField.value,
            suggestions = this.suggestionModel.getAddressSuggestions(),
            option = $currentField.next('datalist').down("[value='" + fieldValue + "']"),
            optionId = option.identify();

        this.currentSuggestionObject = false;

        if (optionId) {
            this.currentSuggestionObject = suggestions.filter(function (item) {
                return item.uuid === optionId;
            });
        }

        if (this.currentSuggestionObject) {
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
    }
};
