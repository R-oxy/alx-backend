#!/usr/bin/env python3
""" MRU Cache module """

BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache defines a MRU caching system """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.keys = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.keys.remove(key)
        self.cache_data[key] = item
        self.keys.append(key)
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            mru_key = self.keys.pop()
            del self.cache_data[mru_key]
            print(f"DISCARD: {mru_key}")

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            self.keys.remove(key)
            self.keys.append(key)
            return self.cache_data[key]
        return None
