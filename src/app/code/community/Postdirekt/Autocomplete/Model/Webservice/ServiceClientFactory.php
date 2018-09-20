<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Model_Webservice_ServiceClient as ServiceClient;
use Postdirekt_Autocomplete_Model_Webservice_Logger as Logger;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_ServiceClientFactory
 *
 * @package   Postdirekt Address
 * @author    Andreas Müller <andreas.mueller@netresearch.de>
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_ServiceClientFactory
{
    /**
     * @param string[] $data
     * @return Postdirekt_Autocomplete_Model_Webservice_ServiceClient
     * @throws Zend_Http_Client_Exception
     */
    public function create(array $data)
    {
        $httpClient = new Varien_Http_Client();
        /** @var Postdirekt_Autocomplete_Model_Config $config*/
        $config = Mage::getModel('postdirekt_autocomplete/config');
        /** @var Postdirekt_Autocomplete_Model_Webservice_Logger $logger */
        $logger = Mage::getModel(
            'postdirekt_autocomplete/webservice_logger',
            array(Logger::PROPERTY_SCOPE => $data['scope'])
        );
        $httpClient->setAuth($config->getUsername($data['scope']), $config->getPassword($data['scope']));
        $args = array(
            ServiceClient::PROPERTY_HTTP_CLIENT => $httpClient,
            ServiceClient::PROPERTY_LOGGER => $logger,
        );
        /** @var Postdirekt_Autocomplete_Model_Webservice_ServiceClient $client */
        $client = Mage::getModel('postdirekt_autocomplete/webservice_serviceClient', $args);

        return $client;
    }
}
