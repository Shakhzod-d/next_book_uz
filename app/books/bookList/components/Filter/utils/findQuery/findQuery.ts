export default function findQuery(queryList: string[], query: string) {
  return !!queryList?.find((item: string) => item === query);
}
