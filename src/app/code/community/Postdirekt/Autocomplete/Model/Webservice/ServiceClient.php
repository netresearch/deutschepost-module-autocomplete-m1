<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Model_Webservice_Data_SearchRequest as SearchRequest;
use Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse as SearchResponse;
use Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest as SelectRequest;
use Postdirekt_Autocomplete_Model_Webservice_Logger as Logger;
use Postdirekt_Autocomplete_Model_Webservice_SearchResponseFactory as SearchResponseFactory;
use Postdirekt_Autocomplete_Exception_Webservice_ClientException as ClientException;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_ServiceClient
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Rico Sonntag <rico.sonntag@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_ServiceClient
{
    const PROPERTY_HTTP_CLIENT = 'http_client';
    const PROPERTY_LOGGER = 'logger';

    const TYPE_REGULAR_ADDRESSES = 'A';

    const SERVICE_URI = 'https://autocomplete.postdirekt.de';
    const SERVICE_OPERATION_SEARCH = 'autocomplete/de/search';
    const SERVICE_OPERATION_SELECT = 'autocomplete/de/select';

    /**
     * @var \Zend_Http_Client
     */
    protected $_httpClient;

    /**
     * @var Logger
     */
    protected $_logger;

    /**
     * @var SearchResponseFactory
     */
    protected $_responseFactory;

    /**
     * Postdirekt_Autocomplete_Model_Webservice_ServiceClient constructor.
     */
    public function __construct($args)
    {
        if (isset($args[self::PROPERTY_HTTP_CLIENT]) && ($args[self::PROPERTY_HTTP_CLIENT] instanceof \Zend_Http_Client)) {
            $this->_httpClient = $args[self::PROPERTY_HTTP_CLIENT];
        }

        if (isset($args[self::PROPERTY_LOGGER]) && ($args[self::PROPERTY_LOGGER] instanceof Logger)) {
            $this->_logger = $args[self::PROPERTY_LOGGER];
        }

        $this->_responseFactory = Mage::getSingleton('postdirekt_autocomplete/webservice_searchResponseFactory');
    }

    /**
     * @param string $operation
     * @param string[] $requestParams
     * @return void
     * @throws \InvalidArgumentException
     */
    protected function prepareRequest($operation, array $requestParams)
    {
        if (!$this->_httpClient instanceof \Zend_Http_Client) {
            throw new \InvalidArgumentException('No HTTP client given.');
        }

        if (!$this->_logger instanceof Logger) {
            throw new \InvalidArgumentException('No message logger given.');
        }

        $uri = sprintf('%s/%s', self::SERVICE_URI, $operation);
        $requestParams['type'] = self::TYPE_REGULAR_ADDRESSES;

        $this->_httpClient->setUri($uri);
        $this->_httpClient->setHeaders('Accept', 'application/json');
        $this->_httpClient->setParameterGet($requestParams);
    }

    /**
     * @param Postdirekt_Autocomplete_Model_Webservice_Data_SearchRequest $searchRequest
     * @return SearchResponse
     * @throws ClientException
     * @throws \InvalidArgumentException
     */
    public function search(SearchRequest $searchRequest)
    {
        $this->prepareRequest(self::SERVICE_OPERATION_SEARCH, $searchRequest->getRequestParams());

        $httpResponse = $this->_httpClient->request();
        $this->_logger->logRequest($this->_httpClient);
        $this->_logger->logResponse($this->_httpClient);

        if (!$httpResponse->isSuccessful()) {
            throw ClientException::statusException($httpResponse->getStatus());
        }

        $jsonBody = $httpResponse->getBody();
        $result = json_decode($jsonBody, true);

        $response = $this->_responseFactory->create($result);
        return $response;
    }

    /**
     * @param Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest $selectRequest
     * @return void
     * @throws ClientException
     * @throws \InvalidArgumentException
     */
    public function select(SelectRequest $selectRequest)
    {
        $this->prepareRequest(self::SERVICE_OPERATION_SELECT, $selectRequest->getRequestParams());

        $httpResponse = $this->_httpClient->request();
        $this->_logger->logRequest($this->_httpClient);
        $this->_logger->logResponse($this->_httpClient);

        if (!$httpResponse->isSuccessful()) {
            throw ClientException::statusException($httpResponse->getStatus());
        }
    }
}
