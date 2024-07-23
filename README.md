Instruction:

1. Set up a Node.js project, download necessary dependencies (multer)
cd Music_Player # Change to your directory name
npm init -y
npm install express multer

2. Create a folder server and public (store backend server and frontend UI/UX)

3. Start the server: node server/index.js

-- Now to publish the codebase onto a server, we use GitHub to post and host them.
-- Step 4 to 8 can be ignored if you upload the file directly to your github page
4. Initialize git for the online server (unless run on localhost port 3000): git init
** Output be like: Initialized empty Git repository in path-to-directory/Music_Player/.git/

5. Add the remote repository for the project: git remote add origin https://github.com/your-github-account/My-Music-Player.git

6. Add all of these file: git add .

7. Commit uploading files: git commit -m "Initial commit"

8.  Push action: git push -u origin main  

9. Deploy Vercel for dynamic hosting server. Install Vercel CLI: npm i -g vercel

10. Deploy: vercel

bash
Sao chép mã
npm i -g vercel
UML Demonstration:
/Music_Player
|-- /public

|   |-- /uploads   # This is where uploaded songs will be stored
|   |-- index.html
|   |-- styles.css
|   |-- script.js

|-- /server
|   |-- index.js

|-- package.json
