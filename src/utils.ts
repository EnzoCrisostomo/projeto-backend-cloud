export function mountSearchSet<ItemType>(
  items: ItemType[],
  offset?: number,
  total?: number
) {
  return {
    timestamp: Date.now(),
    total: total ?? 0,
    size: items.length,
    offset: offset ?? 0,
    items,
  };
}

export function mapStatus(status:string){
  if (status === "A"){
    return 'ativo'
  }else if(status === "I"){
    return 'inativo'
  }
}