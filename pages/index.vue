<template>
  <div class="MainPage">
    <div class="Header mb-3">
      <page-header :icon="headerItem.icon">
        {{ headerItem.title }}
      </page-header>
      <div class="UpdatedAt">
        <span>{{ $t('最終更新') }} </span>
        <time :datetime="updatedAt">{{ Data.lastUpdate }}</time>
      </div>
      <div
        v-show="!['ja', 'ja-basic'].includes($i18n.locale)"
        class="Annotation"
      >
        <span>{{ $t('注釈') }} </span>
      </div>
    </div>
    <whats-new class="mb-4" :items="newsItems" />
    <static-info
      class="mb-4"
      :url="localePath('/about')"
      :text="
        $t(
          '当サイトは有志が作成したものです。当サイトに関するお問い合わせは葛飾区ではなく、当サイト運営まで。'
        )
      "
    />
    <static-card>
      {{
        $t(
          '当サイトは葛飾区より発表される感染者一覧のPDFを参考に作成しています．'
        )
      }}<br />
      {{
        $t(
          '東京都福祉保健局が公開している人数との差異がありますが，これは葛飾区が東京都と確認中の情報についても公開しているためです．'
        )
      }}<br />
      {{
        $t(
          'また，細心の注意を払っておりますが，データに間違いがある可能性がございます．正確な情報は葛飾区の公式ホームページをご覧ください．'
        )
      }}
    </static-card>
    <v-row class="DataBlock">
      <confirmed-cases-details-card />
      <confirmed-cases-attributes-card />
      <confirmed-cases-number-card />
      <GoogleMapCard />
    </v-row>
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import StaticCard from '@/components/StaticCard.vue'
import Data from '@/data/data.json'
import News from '@/data/news.json'
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
import GoogleMapCard from '@/components/cards/GoogleMapCard.vue'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
  components: {
    PageHeader,
    WhatsNew,
    StaticInfo,
    StaticCard,
    ConfirmedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    GoogleMapCard
  },
  data() {
    const data = {
      Data,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('区内の最新感染動向')
      },
      newsItems: News.newsItems
    }
    return data
  },
  computed: {
    updatedAt() {
      return convertDatetimeToISO8601Format(this.$data.Data.lastUpdate)
    }
  },
  head(): MetaInfo {
    return {
      title: this.$t('区内の最新感染動向') as string
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  .Header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @include lessThan($small) {
      flex-direction: column;
      align-items: baseline;
    }
  }

  .UpdatedAt {
    @include font-size(14);

    color: $gray-3;
    margin-bottom: 0.2rem;
  }

  .Annotation {
    @include font-size(12);

    color: $gray-3;
    @include largerThan($small) {
      margin: 0 0 0 auto;
    }
  }
  .DataBlock {
    margin: 20px -8px;

    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }

      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
