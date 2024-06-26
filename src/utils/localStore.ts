import { Food, ProductCardProps } from "../types";

class LocalStore {
  store(name: string, items: Food) {
    localStorage.setItem(name, JSON.stringify(items));
  }

  stores(name: string, items: Food) {
    // Retrieve stored items and parse them. If no items are stored, start with an empty array.
    const storedItems = JSON.parse(localStorage.getItem(name) || "[]");

    // Push the new item into the array
    storedItems.push(items);
    // Save the updated array back to localStorage
    localStorage.setItem(name, JSON.stringify(storedItems));
  }

  gets(name: string) {
    return JSON.parse(localStorage.getItem(name) || "[]");
  }

  delete (name:string) {
    localStorage.removeItem(name);
  }

  deleteById(name: string, id: number) {
    const items:Food[] = localStore.gets(name);
    const newItemFoods = items.filter((currentFood) => currentFood.id !== id);
    localStorage.setItem(name, JSON.stringify(newItemFoods));

  }
}

const localStore = new LocalStore();
export default localStore;
