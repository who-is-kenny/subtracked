// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Subscription } from './types/types';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import Home from './pages/Home';
import AddSubscription from './pages/AddSubscription';

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(subscriptions);
  }, [subscriptions]);

  return (
    <Routes>
      <Route path="/" element={<Home subscriptions={subscriptions} setSubscriptions={setSubscriptions} />} />
      <Route path="/add" element={<AddSubscription subscriptions={subscriptions} setSubscriptions={setSubscriptions} />} />
    </Routes>
  );
}

export default App;
