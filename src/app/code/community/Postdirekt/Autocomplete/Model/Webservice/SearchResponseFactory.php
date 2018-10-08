<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address as Address;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_SearchResponseFactory
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_SearchResponseFactory
{
    /**
     * @param string[][][] $result De-serialized web service JSON response
     * @return Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse
     */
    public function create(array $result)
    {
        $addresses = array();

        $result = $result['Ergebnisse'];
        if (array_key_exists('Ergebnis', $result)) {
            $result = $result['Ergebnis'];
            // normalize addresses, may be one result or a list of results
            if (!isset($result[0])) {
                $result = array($result);
            }

            foreach ($result as $addressData) {
                $args = array();
                if (isset($addressData['Strasse'])) {
                    $args[Address::STREET] = $addressData['Strasse'];
                }

                if (isset($addressData['Plz'])) {
                    $args[Address::POST_CODE] = $addressData['Plz'];
                }

                $args[Address::CITY] = $addressData['Ort'];
                $args[Address::UUID] = $addressData['UUID'];

                $addresses[]= Mage::getModel(
                    'postdirekt_autocomplete/webservice_data_searchResponse_address',
                    $args
                );
            }
        }

        /** @var Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse $searchResponse */
        $searchResponse = Mage::getModel('postdirekt_autocomplete/webservice_data_searchResponse', $addresses);

        return $searchResponse;
    }
}
