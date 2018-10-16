"use strict";

var AddressAutocomplete = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
AddressAutocomplete.prototype = {
    /**
     * @property {int} typingDelay
     */
    typingDelay: 300,

    /**
     * @property {string} timeoutId
     */
    timeoutId: null,

    /**
     * @property {string} addressItemDivider
     */
    addressItemDivider: ', ',

    /**
     * @property {AutocompleteFields} addressFields
     */
    addressFields: {},

    /**
     * @property {SearchRequest} searchRequest
     */
    searchRequest: {},

    /**
     * @property {SelectRequest} selectRequest
     */
    selectRequest: {},

    /**
     * @property {AutocompleteAddressSuggestions} addressSuggestions
     */
    addressSuggestions: {},

    /**
     * @property {AutocompleteAddressData} addressData
     */
    addressData: {},

    /**
     * @property {FieldInput} fieldInputAction
     */
    fieldInputAction: {},

    /**
     * @property {DataListRenderer|ListRenderer} datalistRenderer
     */
    datalistRenderer: {},

    /**
     * @property {DatalistSelect} datalistSelectAction
     */
    datalistSelectAction: {},

    /**
     * @property {CountrySelect} countrySelect
     */
    countrySelect: {},

    /**
     * @param {string} formId
     * @param {string} searchUrl
     * @param {string} respondUrl
     * @param {Object}  watchedFieldIds
     *
     * @constructor
     */
    initialize: function (formId, searchUrl, respondUrl, watchedFieldIds) {
        var form                    = $(formId);
        this.addressFields          = new AutocompleteFields(form, watchedFieldIds);
        this.searchRequest          = new SearchRequest(searchUrl);
        this.selectRequest          = new SelectRequest(respondUrl);
        this.addressSuggestions     = new AutocompleteAddressSuggestions({}, this.addressFields);
        this.addressData            = new AutocompleteAddressData({});
        this.fieldInputAction       = new FieldInput(this.addressFields, this.addressData);
        this.countrySelect          = new CountrySelect(form);
        this.datalistSupport        = new DatalistSupport();
        this.datalistSelectAction   = new DatalistSelect(this.addressFields, this.addressSuggestions);
        this.datalistRenderer       = this.getDatalistRenderer();

        /**
         * Attach event handlers to input fields
         */
        this.addressFields.getIds().each(function (fieldId) {
            var fieldItem = this.addressFields.getFieldById(fieldId);
            // Set field name as data attribute to prevent problems with colon selector
            fieldItem.setAttribute('data-address-item', fieldId);
                fieldItem.observe('keyup', this.handleFieldKeystroke.bind(this));
                fieldItem.observe('focus', this.handleFieldFocus.bind(this));
                fieldItem.observe('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
        }.bind(this));

        this.removeListOnCountryChange();
        this.fieldInputAction.updateAdressData();
    },

    /**
     * Handles keystrokes, but does not react to navigation keys.
     *
     * @param {KeyboardEvent} e
     */
    handleFieldKeystroke: function (e) {
        var navigatorCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];
        if (navigatorCodes.indexOf(e.code) === -1) {
            this.fieldInputAction.updateAddressDataFromField(e.target);
            this.triggerDelayedCallback(
                function () {
                    this.searchAction(e.target)
                }.bind(this),
                this.typingDelay
            );
        }
    },

    /**
     * @param {FocusEvent} e
     */
    handleFieldFocus: function (e) {
        this.fieldInputAction.updateAddressDataFromField(e.target);

        this.triggerDelayedCallback(
            function () {
                this.searchAction(e.target)
            }.bind(this),
            this.typingDelay
        );
    },

    /**
     * @param {Event} e
     */
    handleDatalistSelect: function (e) {
        var uuid = this.datalistRenderer.getSuggestionUuid(e.target);

        // Remove focus after selection, preventing browsers from re-showing the datalist.
        e.target.blur();

        // Update all observed fields after item was selected in datalist
        this.datalistSelectAction.updateFields(uuid);
        this.selectAction();
    },

    /**
     * Triggers an delayed callback.
     *
     * @private
     * @param {Function} callback Callback to execute after timeout
     * @param {int}      delay    Delay in milliseconds
     */
    triggerDelayedCallback: function (callback, delay) {
        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId === 'number') {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    },

    /**
     * Executes a search request.
     *
     * @private
     * @param {HTMLElement} $currentField
     */
    searchAction: function ($currentField) {
        if (this.addressData.isEmpty()) {
            return;
        }

        if (this.countrySelect.isGermany) {
            this.searchRequest.doSearchRequest(this.addressData.getData(), function (json) {
                this.addressSuggestions.setAddressSuggestions(json);
                /** Only render anything if the input is still active. */
                if ($currentField === document.activeElement) {
                    this.datalistRenderer.render($currentField);
                }
            }.bind(this));
        }
    },

    /**
     * Executes a select request.
     *
     * @private
     */
    selectAction: function () {
        var selectedSuggestion = this.datalistSelectAction.getCurrentSuggestion();

        if (!selectedSuggestion || !selectedSuggestion.uuid) {
            throw 'Missing required field <uuid>';
        }

        this.selectRequest.doSelectRequest(selectedSuggestion);
    },

    /**
     * Remove all datalists when country is not Germany.
     *
     * @private
     */
    removeListOnCountryChange: function () {
        this.countrySelect.listenOnChange(function (isGermany) {
            if (!isGermany) {
                this.addressFields.getFields().each(function (field) {
                    this.datalistRenderer.removeDatalist(field);
                }.bind(this));
            }
        }.bind(this));
    },

    /**
     * Get datalist renderer pending on ability of dealing with datalist element
     *
     * @returns {Object}
     */
    getDatalistRenderer: function() {
        if (this.datalistSupport.hasSupport()) {
            return new DataListRenderer(this.addressSuggestions, this.addressItemDivider);
        }
        return new ListRenderer(this.addressSuggestions, this.addressItemDivider);
    }
};
