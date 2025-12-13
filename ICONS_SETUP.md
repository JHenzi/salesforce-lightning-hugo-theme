# SLDS Icons Setup (Optional)

## Current Status

The theme works **without** downloading the SLDS icons. We use:
- Image logos (if configured in `config.yml`)
- Placeholder icons (emoji/text fallbacks)

## If You Want Authentic SLDS Icons

To use the official Salesforce Lightning Design System icons:

1. **Download the icons:**
   ```bash
   cd themes/salesforce-lighting/static
   wget https://v1.lightningdesignsystem.com/assets/downloads/salesforce-lightning-design-system-icons.zip
   unzip salesforce-lightning-design-system-icons.zip
   rm salesforce-lightning-design-system-icons.zip
   ```

2. **Expected structure after extraction:**
   ```
   static/
   └── assets/
       └── icons/
           ├── action-sprite/
           ├── custom-sprite/
           ├── doctype-sprite/
           ├── standard-sprite/
           └── utility-sprite/
   ```

3. **Update icon references in templates:**
   - Header: Change placeholder to use actual SVG sprites
   - Post cards: Use proper icon references

## Benefits of Using Icons

- ✅ Authentic Salesforce look and feel
- ✅ Consistent iconography across the site
- ✅ Scalable vector graphics
- ✅ Professional appearance

## Current Workaround

The theme uses:
- Image logos (recommended - use your own logo)
- CSS-based icon containers with background colors
- Emoji/text placeholders as fallbacks

This works perfectly fine and doesn't require any downloads!

