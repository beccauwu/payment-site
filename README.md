# Payment Sites

## 1\. Introduction

The site is a demo for a Django Rest Framework-backend, ReactJs-frontend e-commerce website.

x. Functionality

### 1\. Front\-end

---

For the front end, I chose to use ReactJS. I started the project with plain JavaScript but soon realised that the functionality I have planned would require unreasonably much effort in plain JS.
React was a great alternative due to the ability for state management and managing context natively. This and the fact that I would be able to use the same few components throughout made the choice to completely remake core logic surprisingly easy.

## 2.

## x. Deployment

I do usually deploy my apps to Heroku but due to recent events, I was worried that the site would not remain up for very long. Instead of SSL encrypting my domain myself (as my domain registrar does not allow this), I use Cloudflare to encrypt and proxy the traffic to my site. /

The app is deployed on an Amazon EC2 instance via the following procedure:

1. Create a new Ubuntu EC2 instance on[AWS](https://aws.amazon.com/ec2/)
2. Create SSH keys for your instance[(AWS docs)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
3. Connect to your instance using SSH:`ssh -tt -i <path/to/file.pem> <username>@public-address.amazonaws.com`
4. Update your system by running`sudo apt update && sudo apt upgrade`
5. Install Docker:`sudo apt install -y docker`
6. Move your app files to your instance by either cloning the repository or connecting via VSCode remote desktop using SSH
7. Copy the simplified deployment script (link) to your app's root folder (one directory above manage.py)
8. Run the script`sudo bash run.sh`
   1. Choose configure
   2. Provide the required information
   3. The script will copy all the required files to their directories
9. Run`sudo docker compose -f docker-compose.prod.yml up -d` in the same directory
10. Create or login to your Cloudflare account
    * If you don't already have your domain managed by Cloudflare, follow[this](https://developers.cloudflare.com/fundamentals/get-started/setup/) guide on how to set up Cloudflare
11. Under DNS, create a new CNAME record
    1. Enter your desired subdomain (or @ for root) in the "Name" field, and the public address of your EC2 instance in the "Content" field
    2. Make sure you have selected for your connection to be proxied (you will know it is if the cloud is orange)
    3. Save the record
12. Your site should now be available at the domain you chose

## x. Bugs

🐝 Bug:

🚧 Cause:

🩺 Fix:

## x. Testing

All functionality has been thoroughly tested manually based on Customer Stories as shown below:

---

#### As a customer I...

🚀 **Implementation:**

🧐 **Test:**

📜 **Result:**

✅ **Verdict:**
