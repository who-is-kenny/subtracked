// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Subscription } from './types/SubscriptionType';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import Home from './pages/Home';
import AddSubscription from './pages/AddSubscription';
import Settings from './pages/Settings';

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(subscriptions);
  }, [subscriptions]);

  return (
    <Routes>
      <Route path="/" element={<Home subscriptions={subscriptions} setSubscriptions={setSubscriptions} />} />
      <Route path="/add" element={<AddSubscription subscriptions={subscriptions} setSubscriptions={setSubscriptions} />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
