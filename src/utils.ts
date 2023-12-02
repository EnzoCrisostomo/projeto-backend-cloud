export function mountSearchSet<ItemType>(
  _items: ItemType[],
  _offset?: number,
  _total?: number
) {
  return {
    _timestamp: Date.now(),
    _total: _total ?? 0,
    _size: _items.length,
    _offset: _offset ?? 0,
    _items,
  };
}

export function mapStatus(status:string){
  if (status === "A"){
    return 'ativo'
  }else if(status === "I"){
    return 'inativo'
  }
}