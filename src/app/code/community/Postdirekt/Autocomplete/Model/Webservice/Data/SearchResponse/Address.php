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
     * The address type. If the element $street is supplied, then this element is also present.
     * The element can contain the following values:
     *
     * A = Address
     * F = Post office
     * P = Packing station
     *
     * @var string
     */
    const ADDRESS_TYPE = 'addressType';

    /**
     * The type used in the request. This element allows conclusions about the presence
     * of the other parameters.
     *
     * @var string
     */
    const REQUEST_TYPE = 'requestType';

    /**
     * The city of the proposal.
     *
     * @var string
     */
    const CITY = 'city';

    /**
     * The district of the proposal.
     *
     * @var string
     */
    const DISTRICT = 'district';

    /**
     * The post code of the proposal.
     *
     * @var string
     */
    const POST_CODE = 'postCode';

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
     * Returns the address type.
     *
     * @return string
     */
    public function getAddressType()
    {
        return $this->getData(self::ADDRESS_TYPE);
    }

    /**
     * Returns the request type.
     *
     * @return string
     */
    public function getRequestType()
    {
        return $this->getData(self::REQUEST_TYPE);
    }

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
     * Returns the district.
     *
     * @return string
     */
    public function getDistrict()
    {
        return $this->getData(self::DISTRICT);
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

    public function jsonSerialize()
    {
        return $this->toArray(
            array(
                self::ADDRESS_TYPE,
                self::REQUEST_TYPE,
                self::CITY,
                self::DISTRICT,
                self::POST_CODE,
                self::STREET,
                self::UUID,
            )
        );
    }
}
