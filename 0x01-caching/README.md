# Caching Project

## Background Context

In this project, you will learn about different caching algorithms and how to implement them.

## Resources

Read or watch:
- [Cache replacement policies - FIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_(FIFO))
- [Cache replacement policies - LIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#Last_In_First_Out_(LIFO))
- [Cache replacement policies - LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU))
- [Cache replacement policies - MRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Most_Recently_Used_(MRU))
- [Cache replacement policies - LFU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Frequently_Used_(LFU))

## Learning Objectives

At the end of this project, you should be able to explain the following concepts:

### General
- What a caching system is
- What FIFO means
- What LIFO means
- What LRU means
- What MRU means
- What LFU means
- The purpose of a caching system
- The limitations of a caching system

## Requirements

### Python Scripts
- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
- All your files should end with a new line
- The first line of all your files should be exactly `#!/usr/bin/env python3`
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the `pycodestyle` style (version 2.5)
- All your files must be executable
- The length of your files will be tested using `wc`
- All your modules should have a documentation (`python3 -c 'print(__import__("my_module").__doc__)'`)
- All your classes should have a documentation (`python3 -c 'print(__import__("my_module").MyClass.__doc__)'`)
- All your functions (inside and outside a class) should have a documentation (`python3 -c 'print(__import__("my_module").my_function.__doc__)'` and `python3 -c 'print(__import__("my_module").MyClass.my_function.__doc__)'`)
- A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class or method (the length of it will be verified)

### More Info

#### Parent class `BaseCaching`
All your classes must inherit from `BaseCaching` defined below:

```python
$ cat base_caching.py
#!/usr/bin/python3
""" BaseCaching module
"""

class BaseCaching():
    """ BaseCaching defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    MAX_ITEMS = 4

    def __init__(self):
        """ Initiliaze
        """
        self.cache_data = {}

    def print_cache(self):
        """ Print the cache
        """
        print("Current cache:")
        for key in sorted(self.cache_data.keys()):
            print("{}: {}".format(key, self.cache_data.get(key)))

    def put(self, key, item):
        """ Add an item in the cache
        """
        raise NotImplementedError("put must be implemented in your cache class")

    def get(self, key):
        """ Get an item by key
        """
        raise NotImplementedError("get must be implemented in your cache class")
```

## Tasks

### 0. Basic dictionary

Create a class `BasicCache` that inherits from `BaseCaching` and is a caching system:
- You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
- This caching system doesn’t have a limit

#### Methods
- `put(self, key, item)`:
  - Must assign to the dictionary `self.cache_data` the item value for the key `key`.
  - If `key` or `item` is `None`, this method should not do anything.
- `get(self, key)`:
  - Must return the value in `self.cache_data` linked to `key`.
  - If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.

### 1. FIFO caching

Create a class `FIFOCache` that inherits from `BaseCaching` and is a caching system:
- You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
- You can overload `__init__(self):` but don’t forget to call the parent init: `super().__init__()`

#### Methods
- `put(self, key, item)`:
  - Must assign to the dictionary `self.cache_data` the item value for the key `key`.
  - If `key` or `item` is `None`, this method should not do anything.
  - If the number of items in `self.cache_data` is higher than `BaseCaching.MAX_ITEMS`:
    - You must discard the first item put in cache (FIFO algorithm)
    - You must print `DISCARD:` with the key discarded and following by a new line
- `get(self, key)`:
  - Must return the value in `self.cache_data` linked to `key`.
  - If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.

### 2. LIFO Caching

Create a class `LIFOCache` that inherits from `BaseCaching` and is a caching system:
- You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
- You can overload `__init__(self):` but don’t forget to call the parent init: `super().__init__()`

#### Methods
- `put(self, key, item)`:
  - Must assign to the dictionary `self.cache_data` the item value for the key `key`.
  - If `key` or `item` is `None`, this method should not do anything.
  - If the number of items in `self.cache_data` is higher than `BaseCaching.MAX_ITEMS`:
    - You must discard the last item put in cache (LIFO algorithm)
    - You must print `DISCARD:` with the key discarded and following by a new line
- `get(self, key)`:
  - Must return the value in `self.cache_data` linked to `key`.
  - If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.

### 3. LRU Caching

Create a class `LRUCache` that inherits from `BaseCaching` and is a caching system:
- You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
- You can overload `__init__(self):` but don’t forget to call the parent init: `super().__init__()`

#### Methods
- `put(self, key, item)`:
  - Must assign to the dictionary `self.cache_data` the item value for the key `key`.
  - If `key` or `item` is `None`, this method should not do anything.
  - If the number of items in `self.cache_data` is higher than `BaseCaching.MAX_ITEMS`:
    - You must discard the least recently used item (LRU algorithm)
    - You must print `DISCARD:` with the key discarded and following by a new line
- `get(self, key)`:
  - Must return the value in `self.cache_data` linked to `key`.
  - If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.

### 4. MRU Caching

Create a class `MRUCache` that inherits from `BaseCaching` and is a caching system:
- You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
- You can overload `__init__(self):` but don’t forget to call the parent init: `super().__init__()`

#### Methods
- `put(self, key, item)`:
  - Must assign to the dictionary `self.cache_data` the item value for the key `key`.
  - If `key` or `item` is `None`, this method should not do anything.
  - If the number of items in `self.cache_data` is higher than `BaseCaching.MAX_ITEMS`:
    - You must discard the most recently used item (MRU algorithm)
    - You must print `DISCARD:` with the key discarded and following by a new line
- `get(self, key)`:
  - Must return the value in `self.cache_data` linked to `key`.
  - If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.

### 5. LFU Caching (advanced)

Create a class `LFUCache` that inherits from `BaseCaching` and is a caching system:
- You must use `self.cache_data` - dictionary from the parent class `BaseCaching`
- You can overload `__init__(self):` but don’t forget to call the parent init: `super().__init__()`

#### Methods
- `put(self, key, item)`:
  - Must assign to the dictionary `self.cache_data` the item value for the key `key`.
  - If `key` or `item` is `None`, this method should not do anything.
  - If the number of items in `self.cache_data` is higher than `BaseCaching.MAX_ITEMS`:
    - You must discard the

 least frequently used item (LFU algorithm)
    - If you find more than 1 item to discard, you must use the LRU algorithm to discard the least recently used item among them
    - You must print `DISCARD:` with the key discarded and following by a new line
- `get(self, key)`:
  - Must return the value in `self.cache_data` linked to `key`.
  - If `key` is `None` or if the key doesn’t exist in `self.cache_data`, return `None`.
