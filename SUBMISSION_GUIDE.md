# Raycast Store Submission Guide

## ✅ Checklist Before Submitting

### Required Files
- [x] `package.json` - Updated with store requirements
- [x] `README.md` - Comprehensive setup and usage guide
- [x] `CHANGELOG.md` - Version history (placeholder date)
- [x] `.gitignore` - Proper exclusions
- [x] `tsconfig.json` - TypeScript configuration
- [x] `src/` - Source code directory with all commands
- [ ] `extension-icon.png` - 512x512px icon (YOU NEED TO CREATE THIS)

### Package.json Requirements  
- [x] Schema reference for validation
- [x] Proper categories (Developer Tools, Productivity)
- [x] Keywords for discoverability
- [x] Command subtitles and descriptions
- [x] MIT license
- [x] Latest Raycast API version
- [ ] Update `author` field with YOUR Raycast username

### Code Quality
- [x] TypeScript strict mode enabled
- [x] Error handling for API calls
- [x] Loading states and empty states
- [x] Proper form validation
- [x] User feedback with toasts

## 🚀 Submission Steps

1. **Create Icon**: Design a 512x512px PNG icon representing code snippets/Notion
2. **Update Author**: Replace "your-raycast-username" with your actual username
3. **Test Locally**: Run `npm install && npm run build` to validate
4. **Submit**: Run `npm run publish` to open PR in raycast/extensions repo

## 📋 Review Process

- **First Contact**: Within 1 week if all Community Managers available
- **Review Criteria**: Following Extension Guidelines exactly
- **Response Time**: You must respond to reviewer comments to keep PR active
- **Stale Policy**: 14 days inactive = marked stale, 21 days = closed

## 💡 Tips for Faster Approval

### Technical Excellence
- Comprehensive error handling
- Intuitive user interface
- Performance optimization
- Clean, readable code

### Documentation Quality
- Clear setup instructions
- Troubleshooting section
- Team collaboration guide
- Privacy & security information

### Community Value
- Solves real problem for developers
- Unique functionality (not duplicating existing extensions)
- Professional presentation
- Responsive to feedback

## 🎨 Icon Design Guidelines

Your `extension-icon.png` should:
- Be 512x512 pixels in PNG format
- Look good in both light and dark themes
- Instantly convey "code snippets" concept
- Incorporate Notion's visual identity subtly
- Be visually distinct from existing extensions

## 📞 Getting Help

- **Raycast Community Slack**: Fast support and direct team contact
- **GitHub Issues**: Technical problems and feature discussions  
- **Developer Hub**: Track your extension's metrics and issues

## 🏆 Featured Extension Potential

Monthly featured extensions are chosen based on:
- Innovation in developer workflow
- High-quality implementation
- Community adoption
- Creative use of Raycast API

Your Notion Snippets extension has strong potential due to:
- Novel approach to snippet management
- Team collaboration features
- Integration with popular tool (Notion)
- Comprehensive feature set
