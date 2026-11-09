export default class HashCallIdMap {
    private map: Map<string, Set<string>>;
  
    constructor() {
        this.map = new Map<string, Set<string>>();
    }
  
    // Adds a new key with an empty set if it doesn't exist
    addKey(hash: string): void {
        if (!this.map.has(hash)) {
            this.map.set(hash, new Set<string>());
        }
    }
  
    // Adds a CallId to the set for the given hash
    addCallId(hash: string, callId: string): void {
        if (!this.map.has(hash)) {
            this.map.set(hash, new Set<string>());
        }
        this.map.get(hash)!.add(callId);
    }
  
    // Removes a specific CallId from a specific hash
    removeCallId(hash: string, callId: string): void {
        if (this.map.has(hash)) {
            const callIdSet = this.map.get(hash);
            if (callIdSet) {
                callIdSet.delete(callId);
                // Remove the hash key if the set is empty
                if (callIdSet.size === 0) {
                    this.map.delete(hash);
                }
            }
        }
    }
  
    // Removes all CallIds associated with a hash
    removeHash(hash: string): void {
        this.map.delete(hash);
    }
  
    // Gets the set of CallIds for a hash
    getCallIds(hash: string): Set<string> {
        return this.map.get(hash) || new Set();
    }
  
    // Check if a hash exists
    hashExists(hash: string): boolean {
        return this.map.has(hash);
    }
  
    // Prints all hashes and their corresponding CallIds
    printAll(): void {
        this.map.forEach((callIds, hash) => {
            console.log(`${hash}: [${Array.from(callIds).join(', ')}]`);
        });
    }
  }
