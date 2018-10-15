<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Model_Webservice_Logger as Logger;
use Postdirekt_Autocomplete_Model_Webservice_ServiceClient as ServiceClient;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_ServiceClient
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Test_Model_Webservice_ServiceClientTest extends EcomDev_PHPUnit_Test_Case
{
    protected function tearDown()
    {
        $this->setCurrentStore('admin');

        parent::tearDown();
    }

    /**
     * @param string $wsResponseJson
     * @return Postdirekt_Autocomplete_Model_Webservice_ServiceClient
     * @throws Mage_Core_Model_Store_Exception
     * @throws Zend_Http_Client_Exception
     */
    private function getServiceClient($wsResponseJson)
    {
        $this->setCurrentStore('store_two');

        // when in admin area, store context must be obtained differently.
        $storeCode = Mage::app()->getStore()->getCode();

        $config = Mage::getSingleton('postdirekt_autocomplete/config');

        $args = array(Logger::PROPERTY_SCOPE => $storeCode);
        $logger = Mage::getModel('postdirekt_autocomplete/webservice_logger', $args);

        $httpResponse = new \Zend_Http_Response(200, array(), $wsResponseJson);
        $httpAdapter = new \Zend_Http_Client_Adapter_Test();
        $httpAdapter->setResponse($httpResponse);

        $httpClient = new \Zend_Http_Client();
        $httpClient->setAuth($config->getUsername($storeCode), $config->getPassword($storeCode));
        $httpClient->setAdapter($httpAdapter);

        $args = array(
            ServiceClient::PROPERTY_HTTP_CLIENT => $httpClient,
            ServiceClient::PROPERTY_LOGGER => $logger,
        );
        $serviceClient = Mage::getModel('postdirekt_autocomplete/webservice_serviceClient', $args);

        return $serviceClient;
    }

    /**
     * @test
     * @loadFixture autocomplete
     * @dataProvider dataProvider

     * @param string[] $requestData
     * @param string $wsResponseJson
     * @throws Mage_Core_Model_Store_Exception
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     * @throws Zend_Http_Client_Exception
     */
    public function serviceClientSuccess($requestData, $wsResponseJson)
    {
        // this is what comes in via request params from frontend (XHR to controller)
        $searchRequestFactory = Mage::getSingleton('postdirekt_autocomplete/webservice_searchRequestFactory');
        $searchRequest = $searchRequestFactory->create($requestData);

        $serviceClient = $this->getServiceClient($wsResponseJson);
        $wsResponse = $serviceClient->search($searchRequest);

        $addresses = $wsResponse->getAddresses();
        $this->assertInternalType('array', $addresses);
        $this->assertNotEmpty($addresses);
        $this->assertContainsOnly('Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address', $addresses);

        $jsonResponse = json_encode($addresses, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        foreach ($addresses as $address) {
            $this->assertContains($address->getCity(), $jsonResponse);
            $this->assertContains($address->getPostCode(), $jsonResponse);
            $this->assertContains($address->getStreet(), $jsonResponse);
        }
    }
}
