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
     * @var Postdirekt_Autocomplete_Model_Webservice_ServiceClientFactory
     */
    protected $_clientFactory;

    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_SearchRequestFactory
     */
    protected $_searchRequestFactory;

    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory
     */
    protected $_selectRequestFactory;

    /**
     * @var Mage_Core_Helper_Data
     */
    protected $_mageHelper;

    /**
     * Postdirekt_Autocomplete_AutocompleteController constructor.
     * @param Zend_Controller_Request_Abstract $request
     * @param Zend_Controller_Response_Abstract $response
     * @param array $invokeArgs
     */
    public function __construct(
        Zend_Controller_Request_Abstract $request,
        Zend_Controller_Response_Abstract $response,
        array $invokeArgs = array()
    ) {
        $this->_clientFactory = Mage::getModel('postdirekt_autocomplete/webservice_serviceClientFactory');
        $this->_searchRequestFactory = Mage::getModel('postdirekt_autocomplete/webservice_searchRequestFactory');
        $this->_selectRequestFactory = Mage::getModel('postdirekt_autocomplete/webservice_selectRequestFactory');
        $this->_mageHelper = Mage::helper('core/data');

        parent::__construct($request, $response, $invokeArgs);
    }

    /**
     * Only accept ajax requests to this controller
     *
     * @return $this
     */
    public function preDispatch()
    {
        parent::preDispatch();

        if (!$this->getRequest()->isXmlHttpRequest()) {
            $this->getResponse()
                 ->setHeader('HTTP/1.1', '404 Not Found')
                 ->setHeader('Status', '404 File not found');

            $this->_forward('noRoute');
            $this->setFlag('', self::FLAG_NO_DISPATCH, true);
        }

        return $this;
    }

    /**
     * perform search request
     * @throws Zend_Controller_Response_Exception
     */
    public function searchAction()
    {
        $requestData = $this->getRequest()->getParams();
        try {
            $storeCode = Mage::app()->getStore()->getCode();
            $args = array('scope' => $storeCode);
            /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClient $client */
            $client = $this->_clientFactory->create($args);

            $searchRequest = $this->_searchRequestFactory->create($requestData);
            $response = $client->search($searchRequest);
            $addresses = $response->getAddresses();
            $jsonResponse = $this->_mageHelper->jsonEncode($addresses);
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
            $storeCode = Mage::app()->getStore()->getCode();
            /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClient $client */
            $client = $this->_clientFactory->create(array('scope' => $storeCode));
            $selectRequest = $this->_selectRequestFactory->create($requestData);
            $client->select($selectRequest);

            $this->getResponse()->setHttpResponseCode(200);
        } catch (Exception $exception) {
            $this->getResponse()->setHttpResponseCode($exception->getCode());
        }
    }
}
