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
     * @param {Object}      observedFields
     * @param {Object}      suggestionModel
     *
     * @constructor
     */
    initialize: function($currentForm, observedFields, suggestionModel) {
        this.form            = $currentForm;
        this.fields          = observedFields;
        this.fieldNames      = observedFields.getNames();
        this.suggestionModel = suggestionModel;
    },

    /**
     * Returns the selected suggestion object.
     *
     * @returns {boolean|Object}
     */
    getCurrentSuggestion: function () {
        if (this.currentSuggestionObject && this.currentSuggestionObject[0]) {
            return this.currentSuggestionObject[0];
        }

        return false;
    },

    /**
     * Updates all observed fields.
     *
     * @param {HTMLElement} $currentField
     */
    updateFields: function ($currentField) {
        var self        = this,
            fieldValue  = $currentField.value,
            suggestions = this.suggestionModel,
            option      = $currentField.next('datalist').down("[value='" + fieldValue + "']"),
            optionId    = option.identify(),
            currentSuggestionObject;

        if (optionId) {
            currentSuggestionObject = suggestions.getByUuid(optionId);
        }

        if (currentSuggestionObject && currentSuggestionObject.length) {
            // Fill all fields with response values
            this.fieldNames.each(function(fieldName) {

                // Get data selector with address item
                var field = self.fields.getFieldByName(fieldName);

                if (field && currentSuggestionObject[0][fieldName]) {
                    field.value = currentSuggestionObject[0][fieldName];
                }
            });
        }
    },

    /**
     * Returns TRUE whether an datalist element has been selected or not.
     *
     * @param {HTMLElement} $currentField
     *
     * @return {boolean}
     */
    detectSelectEvent: function ($currentField) {
        var fieldValue  = $currentField.value,
            listId      = $currentField.getAttribute('list'),
            $dataList   = $(listId);

        if (!$dataList) {
            return false;
        }

        var option = $dataList.down("[value='" + fieldValue + "']");
        return option && (option.value === fieldValue);
    }
};
