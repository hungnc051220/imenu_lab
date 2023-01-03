echo "Pull from develop branch"
git pull origin develop

echo "install package"
pnpm install

echo "Building production..."
yarn build

echo "Copy to var/www"
cp -r dist/* /var/www/mseller_imenu

echo "Reload nginx"
systemctl reload nginx
