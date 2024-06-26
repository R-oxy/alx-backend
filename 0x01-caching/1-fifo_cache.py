#!/usr/bin/env python3
""" FIFO Cache module """

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache defines a FIFO caching system """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.order.remove(key)
        self.cache_data[key] = item
        self.order.append(key)
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first = self.order.pop(0)
            del self.cache_data[first]
            print(f"DISCARD: {first}")

    def get(self, key):
        """ Get an item by key """
        return self.cache_data.get(key, None)
