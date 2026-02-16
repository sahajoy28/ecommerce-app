# GitHub Push Guide

Complete step-by-step guide to push your e-commerce project to GitHub.

---

## Phase 1: Install Git

### Windows

1. **Download Git for Windows**
   - Go to: https://git-scm.com/download/win
   - Click "Click here to download" or use direct link

2. **Install Git**
   - Run the installer
   - Use default options (recommended)
   - Complete the installation
3. **Verify Installation**
   - Open a new PowerShell or Command Prompt
   - Run: `git --version`
   - Should see: `git version 2.x.x.windows.x`

---

## Phase 2: Create GitHub Account (If You Don't Have One)

1. **Go to GitHub**
   - Visit: https://github.com

2. **Sign Up**
   - Click "Sign up"
   - Enter email, create password
   - Verify email
   - Complete setup

3. **Create Personal Access Token** (Recommended for automatic login)
   - Settings → Developer settings → Personal access tokens → Generate new token
   - Name: "ecommerce-app"
   - Select scopes: `repo` (full control of private repositories)
   - Copy token and save it somewhere safe

---

## Phase 3: Configure Git Locally

### Step 1: Set Your Identity

```powershell
# Set globally (recommended - one time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"

# Verify it worked
git config --list | Select-String "user"
```

Should show:

```
user.name=Your Name
user.email=your.email@gmail.com
```

### Step 2: Cache Your Credentials (Optional but Recommended)

```powershell
# Windows: Use credential manager
git config --global credential.helper manager-core

# macOS: Use keychain
git config --global credential.helper osxkeychain

# Linux: Use credential cache
git config --global credential.helper cache
```

---

## Phase 4: Create GitHub Repository

1. **Go to GitHub**
   - https://github.com/new

2. **Create New Repository**
   - **Repository name:** `ecommerce-app`
   - **Description:** E-commerce Full-Stack App with React & Express
   - **Visibility:** Public (or Private if you prefer)
   - ⚠️ **DO NOT** initialize with README (we already have one)
   - ⚠️ **DO NOT** initialize with gitignore (we already have one)
   - Click **Create repository**

3. **Copy Repository URL**
   - After creation, copy the HTTPS URL (e.g., `https://github.com/yourname/ecommerce-app.git`)

---

## Phase 5: Push Project to GitHub

### Step 1: Navigate to Project

```powershell
cd "c:\Users\joysa\OneDrive\Documents\Projects\Frontend\ecommerce-app"
```

### Step 2: Initialize Git Repository

```powershell
# Initialize git
git init

# Verify
git status
```

Should show:

```
On branch master

No commits yet
```

### Step 3: Add All Files

```powershell
# Add all files (respects .gitignore)
git add .

# Verify what will be added
git status
```

Should show many files but NOT `node_modules/` (because of .gitignore)

### Step 4: Create First Commit

```powershell
git commit -m "Initial commit: E-commerce full-stack application

- Frontend: React + Redux + Styled Components
- Backend: Express.js with API routes
- Design: Modern UI with blue/orange theme
- Features: Products, Cart, Wishlist, Authentication
- Build: Vite with npm workspaces"
```

### Step 5: Add Remote Repository

Replace `YOUR_USERNAME` and paste your actual repository URL:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-app.git

# Or use SSH if you prefer (after setting up SSH keys)
# git remote add origin git@github.com:YOUR_USERNAME/ecommerce-app.git

# Verify remote was added
git remote -v
```

Should show:

```
origin  https://github.com/YOUR_USERNAME/ecommerce-app.git (fetch)
origin  https://github.com/YOUR_USERNAME/ecommerce-app.git (push)
```

### Step 6: Rename Branch (Optional but GitHub Standard)

```powershell
# Rename master to main (GitHub default)
git branch -M main
```

### Step 7: Push to GitHub

```powershell
# Push to GitHub
git push -u origin main
```

**First time:** You may be prompted for:

- **Username:** Your GitHub username
- **Password:** Your personal access token (from Phase 2) or GitHub password

After pushing, should see:

```
Enumerating objects: 142, done.
Counting objects: 100% (142/142), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (142/142), 2.48 MiB, done.
Total 142 (delta 45), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (45/45), done.
To https://github.com/YOUR_USERNAME/ecommerce-app.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote origin/main.
```

---

## Phase 6: Verify on GitHub

1. **Go to your repository**
   - https://github.com/YOUR_USERNAME/ecommerce-app

2. **Check that all files are there:**
   - ✅ `client/` folder
   - ✅ `server/` folder
   - ✅ `doc/` folder
   - ✅ `README.md`
   - ✅ `DEVELOPMENT_GUIDE.md`
   - ✅ `DOCUMENTATION_INDEX.md`
   - ✅ `package.json`
   - ✅ `.gitignore`

3. **Confirm `node_modules/` is NOT there** ✅
   - Size should be ~5-10 MB (not 500+ MB)

---

## Phase 7: Make Future Commits

Once pushed, making updates is easy:

```powershell
# After making changes to your code

# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Common Workflow

```powershell
# Make a feature
# Edit client/src/components/YourComponent.tsx

# After changes
git add .
git commit -m "Add new component: YourComponent"
git push
```

---

## Useful Git Commands

### View Status

```powershell
git status              # See what changed
git log                 # See all commits
git log --oneline       # See commits in short format
```

### Create Branches

```powershell
# Create feature branch
git checkout -b feature/new-feature

# Make changes, then push
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature

# Create pull request on GitHub to merge to main
```

### Undo Changes

```powershell
git restore <filename>     # Undo changes in a file
git restore --staged <filename>  # Unstage a file
git reset --soft HEAD~1    # Undo last commit (keep changes)
git reset --hard HEAD~1    # Undo last commit (delete changes)
```

### Sync with GitHub

```powershell
git pull              # Get latest from GitHub
git fetch             # Check for updates without merging
```

---

## Troubleshooting

### Issue: "fatal: not a git repository"

**Solution:**

```powershell
cd "c:\Users\joysa\OneDrive\Documents\Projects\Frontend\ecommerce-app"
git init
```

### Issue: "fatal: destination path exists"

**Solution:** Repository already exists, use `git remote set-url` instead

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/ecommerce-app.git
```

### Issue: "Permission denied" or Authentication Error

**Solution 1 - Use Personal Access Token:**

- When prompted for password, paste your personal access token (from Phase 2)

**Solution 2 - Use SSH Keys:**

```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@gmail.com"

# Copy public key
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# Add to GitHub: Settings → SSH and GPG keys → New SSH Key
# Then use SSH URL instead: git@github.com:YOUR_USERNAME/ecommerce-app.git
```

### Issue: "Updates were rejected"

**Reason:** Remote has commits you don't have locally

**Solution:**

```powershell
git pull origin main
git push origin main
```

### Issue: "node_modules accidentally pushed"

**Solution:**

```powershell
git rm -r --cached node_modules/
git commit -m "Remove node_modules from tracking"
git push
```

---

## .gitignore Verification

Make sure `.gitignore` contains these critical lines:

```
node_modules/
/dist
/build
.env
npm-debug.log*
```

To verify what will be pushed:

```powershell
git status
git check-ignore -v <filename>    # See if file is ignored
```

---

## Quick Reference

| Task           | Command                        |
| -------------- | ------------------------------ |
| Initialize git | `git init`                     |
| Add files      | `git add .`                    |
| Commit         | `git commit -m "message"`      |
| Add remote     | `git remote add origin <url>`  |
| Push           | `git push -u origin main`      |
| Pull latest    | `git pull`                     |
| See status     | `git status`                   |
| See history    | `git log --oneline`            |
| Create branch  | `git checkout -b feature/name` |
| Switch branch  | `git checkout main`            |
| Delete branch  | `git branch -d feature/name`   |

---

## After Your First Push ✅

1. **GitHub Actions** (Optional but recommended)
   - Go to Actions tab on GitHub
   - Set up automated tests/builds

2. **Add Topics** (For discoverability)
   - Settings → Add topics: `react`, `express`, `ecommerce`, `nodejs`

3. **Add Description**
   - Click "Edit" on repo header
   - Add: "Full-stack e-commerce app built with React and Express"

4. **Pin Important Files**
   - Go to repo → Click "Add topics"
   - Helps others find key documentation

---

## Next Steps

- ✅ Share repository URL with team/collaborators
- ✅ Set up branch protection rules (optional)
- ✅ Add collaborators in Settings → Collaborators
- ✅ Create pull request templates (optional)
- ✅ Enable GitHub Pages if you want live demo (optional)

---

**You're all set to use GitHub!** 🚀

For questions, check [GitHub Docs](https://docs.github.com) or run `git help <command>`
