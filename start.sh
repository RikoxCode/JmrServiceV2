echo "Building JmrServiceV2..."

cd JmrServiceNoSSR
ng build

echo "Building JmrServiceV2... Done"


echo "Starting JmrServiceV2 docker-componse..."
cd ..
sudo docker-compose up
echo "Starting JmrServiceV2 docker-componse... Done"