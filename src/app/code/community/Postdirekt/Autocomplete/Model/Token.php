<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Model_Webservice_Logger as Logger;

/**
 * Class Postdirekt_Autocomplete_Model_Token
 *
 * @package   Postdirekt\Autocomplete\Model
 * @copyright 2020 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Token
{
    /**
     * @var Varien_Http_Client
     */
    private $client;

    /**
     * @var Postdirekt_Autocomplete_Model_Config
     */
    private $config;

    /**
     * @var Postdirekt_Autocomplete_Helper_Data
     */
    private $helper;

    /**
     * @var
     */
    private $store;

    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_Logger
     */
    private $logger;

    public function __construct()
    {
        $this->client = new Varien_Http_Client();
        $this->config = Mage::getSingleton('postdirekt_autocomplete/config');
        $this->helper = Mage::helper('postdirekt_autocomplete/data');
        $this->store = Mage::app()->getStore();
        $this->logger = Mage::getModel(
            'postdirekt_autocomplete/webservice_logger',
            array(Logger::PROPERTY_SCOPE => $this->store->getCode())
        );
    }

    /**
     * @return string
     */
    public function getToken()
    {
        try {
            $this->client->setAuth(
                $this->config->getUsername($this->store->getCode()),
                $this->config->getPassword($this->store->getCode())
            );
            $this->client->setUri('https://autocomplete2.postdirekt.de/autocomplete2/token');
            $this->client->setHeaders('Accept', 'application/json');
            $this->logger->logRequest($this->client, array());
            $httpResponse = $this->client->request();
            $this->logger->logResponse($this->client);
        } catch (Zend_Http_Client_Exception $e) {
            Mage::log($e->getMessage(), null, Postdirekt_Autocomplete_Model_Webservice_Logger::LOG_FILE);
            return '';
        }
        if (!$httpResponse->isSuccessful()) {
            return '';
        }
        $body = $this->helper->jsonDecode($httpResponse->getBody());

        return $body['access_token'];
    }
}
