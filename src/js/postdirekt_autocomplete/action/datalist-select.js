"use strict";

var DatalistSelect = Class.create();

/**
 * Resource model for DatalistSelect objects.
 */
DatalistSelect.prototype = {
    /**
     * @property {AutocompleteFields}
     */
    fields: null,

    /**
     * @property {AutocompleteAddressSuggestions}
     */
    suggestionModel: null,

    /**
     * @property {Object}
     */
    currentSuggestionObject: null,

    /**
     * Initialize.
     *
     * @param {AutocompleteFields} observedFields
     * @param {AutocompleteAddressSuggestions} suggestionModel
     * @param {boolean}     datalistSupport
     * @constructor
     */
    initialize: function(observedFields, suggestionModel, datalistSupport) {
        this.fields          = observedFields;
        this.suggestionModel = suggestionModel;
        this.datalistSuppport = datalistSupport;
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
            option = null;

        if (this.datalistSuppport) {
            option = $currentField.next('datalist').down("[value='" + fieldValue + "']");
        } else {
            console.log($currentField);
            option = $currentField.datalist.down("[data-value='" + fieldValue + "']");
        }
        var optionId = option.identify();

        if (optionId) {
            self.currentSuggestionObject = suggestions.getByUuid(optionId);
        }

        if (self.currentSuggestionObject && self.currentSuggestionObject.length) {
            // Fill all fields with response values
            self.fields.getNames().each(function(fieldName) {
                // Get data selector with address item
                var field = self.fields.getFieldByName(fieldName);

                if (field && self.currentSuggestionObject[0][fieldName]) {
                    field.value = self.currentSuggestionObject[0][fieldName];
                }
            });
        }
    },

    /**
     * Returns TRUE when a datalist element has been selected.
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
