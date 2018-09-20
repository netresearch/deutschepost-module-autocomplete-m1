<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Address_AutocompleteController
 *
 * @package   Postdirekt Address
 * @author    Andreas Müller <andreas.mueller@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      http://www.netresearch.de/
 */
class Postdirekt_Autocomplete_AutocompleteController extends Mage_Core_Controller_Front_Action
{
    /**
     * perform search request
     * @throws Zend_Controller_Response_Exception
     */
    public function searchAction()
    {
        $requestData = $this->getRequest()->getParams();
        try {
            /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClientFactory $clientFactory */
            $clientFactory = Mage::getModel('postdirekt_autocomplete/webservice_serviceClientFactory');
            /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClient $client */
            $client = $clientFactory->create($this->getStoreCode());

            /** @var Postdirekt_Autocomplete_Model_Webservice_SearchRequestFactory $searchRequestFactory */
            $searchRequestFactory = Mage::getModel('postdirekt_autocomplete/webservice_searchRequestFactory');
            $searchRequest = $searchRequestFactory->create($requestData);
            $response = $client->search($searchRequest);
            $addresses = $response->getAddresses();
            $jsonResponse = Mage::helper('core/data')->jsonEncode($addresses);
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $this->getResponse()->setBody($jsonResponse);
        } catch(Exception $exception) {
            $this->getResponse()->setHttpResponseCode($exception->getCode());
        }

    }

    /**
     * perform select request
     * @throws Zend_Controller_Response_Exception
     */
    public function selectAction()
    {
        $requestData = $this->getRequest()->getParams();

        try {
            /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClientFactory $clientFactory */
            $clientFactory = Mage::getModel('postdirekt_autocomplete/webservice_serviceClientFactory');
            /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClient $client */
            $client = $clientFactory->create($this->getStoreCode());
            /** @var Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory $selectRequestFactory */
            $selectRequestFactory = Mage::getModel('postdirekt_autocomplete/webservice_selectRequestFactory');
            $selectRequest = $selectRequestFactory->create($requestData);
            $client->select($selectRequest);
            $this->getResponse()->setHttpResponseCode(200);
        } catch (Exception $exception) {
            $this->getResponse()->setHttpResponseCode($exception->getCode());
        }
    }

    protected function getStoreCode()
    {
        $storeCode = Mage::app()->getStore()->getCode();
        return array('scope' => $storeCode);
    }
}
