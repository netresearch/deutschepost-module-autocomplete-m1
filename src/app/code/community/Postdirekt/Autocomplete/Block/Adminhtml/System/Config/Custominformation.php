<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Postdirekt_Autocomplete_Block_Adminhtml_System_Config_Custominformation
 *
 * @package Postdirekt\Autocomplete\Block
 * @author  Rico Sonntag <rico.sonntag@netresearch.de>
 * @license https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link    https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Block_Adminhtml_System_Config_Custominformation
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    /**
     * Init template.
     *
     * @return $this
     */
    protected function _prepareLayout()
    {
        parent::_prepareLayout();

        if (!$this->getTemplate()) {
            $this->setTemplate('postdirekt_autocomplete/system/config/custominformation.phtml');
        }

        return $this;
    }

    /**
     * Returns the rendered template.
     *
     * @param \Varien_Data_Form_Element_Abstract $element
     *
     * @return string
     */
    public function render(Varien_Data_Form_Element_Abstract $element)
    {
        return $this->_toHtml();
    }

    /**
     * Returns the current module version.
     *
     * @return string
     */
    public function getModuleVersion()
    {
        /** @var Postdirekt_Autocomplete_Helper_Data $helper */
        $helper = Mage::helper('postdirekt_autocomplete');
        return $helper->getModuleVersion();
    }

    /**
     * Returns the logo image URL.
     *
     * @return string
     */
    public function getLogoUrl()
    {
        return Mage::getDesign()->getSkinUrl('images/postdirekt_autocomplete/deutsche-post-logo.svg');
    }
}
