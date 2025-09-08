# La Huerta Inventory 
### Description

This project is an inventory managment system used to controle La huerta's store product. 
It helps store owners and employees track products, manage stock levels, prevent shortages, and show useful sales and inventory graphics.

- 📦 **Product Management**: Add, update, and remove products of different categories (fruits, vegetables, bakery, beverages, etc.).  
- 📊 **Inventory Control**: Track stock levels in real time and set low-stock alerts.  
- 💰 **Sales Tracking**: Record sales and automatically update inventory.
- 📈 **Graphic report: show sales and inventory graphic to identify earnings and sales tracking.
- 🔍 **Search and Filter**: Find products quickly by name, category, or stock level.

### Future Features
- Sales reports generation.
- PDF and Excel report exports.


## 🚀 Built With

This project was developed using the **MERN stack**:

<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /> – NoSQL Database  
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> – Web application framework for Node.js  
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />  – Frontend library for building UI  
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /> – JavaScript runtime environment  


## 📷 Screenshoots


<p align="center">
<img width="1366" height="606" alt="Home_graficos" src="https://github.com/user-attachments/assets/411eec4c-3458-4da2-bc6b-0b08ebec835e"/>
</p>

<p align="center">
<img width="1348" height="604" alt="Ventas" src="https://github.com/user-attachments/assets/2377afdd-49bf-40f9-9811-013d74ec24e3" />
</p>

<p align="center">
<img width="1359" height="602" alt="Productos" src="https://github.com/user-attachments/assets/d6e191cd-f8c2-404c-9d80-51bb98470c64" />
</p>

<p align="center">
<img width="1345" height="602" alt="Inventario" src="https://github.com/user-attachments/assets/a5e72c0f-02ec-4465-b458-fe4fb7ae6702" />
</p>

<p align="center">
<img width="1362" height="604" alt="registroProductos" src="https://github.com/user-attachments/assets/dcea684e-cdd0-4ebf-ae87-c7d5a144ad88" />
</p>

<p align="center">
<img width="1342" height="604" alt="IngresoBarcode" src="https://github.com/user-attachments/assets/9bdd8696-d95c-422c-84f8-794b59996972" />
</p>

## ⚙️ Installation

### Requirements
- Node.js >= 18  
- MongoDB >= 6.0  
- Git  

### Steps
1. Clone the repository
```bash
git clone https://github.com/PabloAlarconArel/La_Huerta_inventory.git
cd La_Huerta_inventory
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create environment variables
Backend (.env file in /backend)
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/la-huerta
JWT_SECRET=yourSecretKey
```
Frontend (.env file in /frontend)
```bash
VITE_API_URL=http://localhost:5000
```
5. Start the backend
```bash
cd Backend
npm run dev
```
6. Start the frontend (in a new terminal)
```bash
cd Front
npm run dev
```

## 📄 License

This project is licensed under the MIT License.




