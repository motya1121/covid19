type DataType = {
  attr: '検査実施人数'
  value: number
  children: [
    {
      attr: '陽性患者数'
      value: number
      children: [
        {
          attr: '入院調整中'
          value: number
        },
        {
          attr: '入院中'
          value: number
        },
        {
          attr: '宿泊療養中'
          value: number
        },
        {
          attr: '自宅療養中'
          value: number
        },
        {
          attr: '死亡'
          value: number
        },
        {
          attr: '回復'
          value: number
        },
        {
          attr: '不明'
          value: number
        }
      ]
    }
  ]
}

type ConfirmedCasesType = {
  検査実施人数: number
  陽性者数: number
  入院調整中: number
  入院中: number
  宿泊療養中: number
  自宅療養中: number
  死亡: number
  回復: number
  不明: number
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 */
export default (data: DataType) => {
  const formattedData: ConfirmedCasesType = {
    検査実施人数: data.value,
    陽性者数: data.children[0].value,
    入院調整中: data.children[0].children[0].value,
    入院中: data.children[0].children[1].value,
    宿泊療養中: data.children[0].children[2].value,
    自宅療養中: data.children[0].children[3].value,
    死亡: data.children[0].children[4].value,
    回復: data.children[0].children[5].value,
    不明: data.children[0].children[6].value
  }
  return formattedData
}
