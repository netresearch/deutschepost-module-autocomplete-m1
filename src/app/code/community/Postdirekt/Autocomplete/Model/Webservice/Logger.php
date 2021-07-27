<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_Logger
 *
 * @package   Postdirekt\Autocomplete\Model
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_Logger
{
    const PROPERTY_SCOPE = 'scope';

    const LOG_FILE = 'postdirekt_autocomplete.log';

    /**
     * @var Postdirekt_Autocomplete_Model_Config
     */
    protected $_config;

    /**
     * @var string Store Code
     */
    protected $_scope;

    /**
     * Postdirekt_Autocomplete_Model_Webservice_Logger constructor.
     *
     * @param mixed[] $args
     * @throws Mage_Core_Model_Store_Exception
     */
    public function __construct(array $args)
    {
        $this->_config = Mage::getSingleton('postdirekt_autocomplete/config');
        $this->_scope = isset($args[self::PROPERTY_SCOPE])
            ? $args[self::PROPERTY_SCOPE]
            : Mage::app()->getStore()->getCode();
    }


    /**
     * @param Zend_Http_Client $client
     * @param  string[]        $requestParams
     *
     * @return void
     */
    public function logRequest(Zend_Http_Client $client, $requestParams)
    {
        if (!$this->_config->isLoggingEnabled($this->_scope)) {
            return;
        }

        $lines = array(
            'OUTGOING REQUEST:',
            $client->getUri() . '?' . http_build_query($requestParams),
            $client->getLastRequest(),
        );
        Mage::log(implode(PHP_EOL, $lines), null, self::LOG_FILE);
    }

    /**
     * @param Zend_Http_Client $client
     *
     * @return void
     */
    public function logResponse(Zend_Http_Client $client)
    {
        if (!$this->_config->isLoggingEnabled($this->_scope)) {
            return;
        }

        $response = $client->getLastResponse();
        if (!$response->isSuccessful()) {
            $lines = array(
                'INCOMING RESPONSE:',
                $response->getHeadersAsString(true),
            );
            Mage::log(implode(PHP_EOL, $lines), Zend_Log::ERR, self::LOG_FILE);
        } else {
            $lines = array(
                'INCOMING RESPONSE:',
                $response->getHeadersAsString(true),
                $response->getBody(),
            );
            Mage::log(implode(PHP_EOL, $lines), null, self::LOG_FILE);
        }
    }
}
