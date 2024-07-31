// 9-stock.js
import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const app = express();
const PORT = 1245;

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

function getItemById(id) {
  return listProducts.find(product => product.id === parseInt(id));
}

async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock !== null ? parseInt(stock) : 0;
}

app.use(express.json());

app.get('/list_products', (req, res) => {
  const response = listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  }));
  res.json(response);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const product = getItemById(itemId);
  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  const currentStock = await getCurrentReservedStockById(itemId);
  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: product.stock - currentStock,
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const product = getItemById(itemId);
  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  const currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock >= product.stock) {
    return res.status(400).json({ status: 'Not enough stock available', itemId });
  }
  await reserveStockById(itemId, currentStock + 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
