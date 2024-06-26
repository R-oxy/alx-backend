#!/usr/bin/python3
""" LFU Caching """

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFU Cache system """

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.frequency = {}
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.frequency[key] += 1
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_keys = [k for k, v in self.frequency.items() if v == min(
                    self.frequency.values())]
                if len(lfu_keys) > 1:
                    lru_key = next(k for k in self.order if k in lfu_keys)
                else:
                    lru_key = lfu_keys[0]
                del self.cache_data[lru_key]
                del self.frequency[lru_key]
                self.order.remove(lru_key)
                print(f"DISCARD: {lru_key}")

            self.cache_data[key] = item
            self.frequency[key] = 1

        if key in self.order:
            self.order.remove(key)
        self.order.append(key)

    def get(self, key):
        """ Get an item by key """
        if key is not None and key in self.cache_data:
            self.frequency[key] += 1
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data[key]
        return None
