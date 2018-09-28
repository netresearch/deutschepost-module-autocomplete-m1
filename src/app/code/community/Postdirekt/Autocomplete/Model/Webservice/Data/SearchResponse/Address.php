<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_Data_SearchResponse_Address
    extends Varien_Object
    implements JsonSerializable
{
    /**
     * The city of the proposal.
     *
     * @var string
     */
    const CITY = 'city';

    /**
     * The post code of the proposal.
     *
     * @var string
     */
    const POST_CODE = 'postcode';

    /**
     * The street, post office number or packing station number depending on the value of the
     * $addressType element.
     *
     * @var string
     */
    const STREET = 'street';

    /**
     * The UUID of the proposal. This UUID is needed for the feedback.
     *
     * @var string
     */
    const UUID = 'uuid';

    /**
     * Returns the city.
     *
     * @return string
     */
    public function getCity()
    {
        return $this->getData(self::CITY);
    }

    /**
     * Returns the post code.
     *
     * @return string
     */
    public function getPostCode()
    {
        return $this->getData(self::POST_CODE);
    }

    /**
     * Returns the street, post office number or packing station number depending on $addressType.
     *
     * @return string
     */
    public function getStreet()
    {
        return $this->getData(self::STREET);
    }

    /**
     * Returns the uuid.
     *
     * @return string
     */
    public function getUuid()
    {
        return $this->getData(self::UUID);
    }

    /**
     * @return mixed[]
     */
    public function jsonSerialize()
    {
        return $this->toArray(
            array(
                self::CITY,
                self::POST_CODE,
                self::STREET,
                self::UUID,
            )
        );
    }
}
