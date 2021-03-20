<template>
  <div>
    <h1 class="title">利用規約</h1>
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>

    <div class="termsContainer">
      <p>
<pre class="policytext">
遠隔療養者モニタリングシステム利用規約

この利用規約（以下「本規約」といいます。）では、遠隔療養者モニタリングシステム（以下「本システム」といいます。）を利用する方に同意していただく必要のある事柄を記載しています。利用者が本システムを利用する際には、本規約に同意したものとみなされ、本規約が適用されます。本規約に同意されない場合、本システムをご利用頂けませんので、ご利用の前に必ずお読みください。

第１条（システム目的）
本システムは、新型コロナウイルス感染症対策の一環として、患者の健康を適切に管理すること等を目的としています。

第２条（情報の取り扱い）
１ データ収集範囲
北海道が本システムで収集する「健康観察データ」は、以下のとおりです。
（１）北海道への報告・健康観察の日時
（２）体温
（３）酸素飽和度
（４）脈拍
（５）身体症状について
２ 収集した情報の取扱いについて
システム利用者（以下「利用者」といいます。）が、健康観察データ（体温、症状等）の入力を行うことにより、北海道は以下の目的で情報を活用します。
（１）患者の健康観察
（２）医療機関への入院調整
（３）感染症管理に必要な疫学的分析
３ 第三者への提供
統計・分析等及び患者の健康状態把握並びに適切な医療の提供のため、国及び保健所を設置する市並びに医療機関（入院の必要が生じた場合の入院調整先医療機関に限る。）に情報を提供します。
４ 安全管理
北海道からの情報提供先においては、本システムで収集した情報等の漏洩、滅失又は毀損の防止その他の利用者情報等の安全管理のために必要かつ適切な措置を講じます。

第３条（本システムの利用）
１ 利用開始
利用者は、北海道が発行したログインID及びパスワードを利用者の携帯電話番号のショートメールサービス（以下、SMS）で受け取った時点で、システムの利用が開始できます。なお、ログインID及びパスワードを発行する際に使用した携帯電話番号は、本システムとは別途のSMS配信サービスを通して取得するにすぎず、かつ、同サービス上においても２４時間を超えて保有しないものとします。
２ ログイン用URLの管理
（１）利用者は、北海道が発行したログイン用URLを管理及び保管するものとします。
（２）ログイン用URLの管理不十分、使用上の過誤、第三者の使用等による損害の責任は利用者が負うものとし、北海道は一切の責任を負いません。
（３）利用者は、ログイン用URLが盗用され、又は第三者に使用されていることが判明した場合には、直ちにその旨を北海道に連絡するとともに、北海道からの指示に従うものとします。
３ 禁止行為
本システムの目的外利用を禁止します。
４ 権利の帰属
本システムに関する著作権等の知的財産権その他一切の権利は、北海道に帰属します。

第４条（本システムの変更、追加、廃止及び中断等）
１ 北海道は、利用者に事前の通知をすることなく、本システムの内容の全部又は一部を変更、削除又は追加することができるものとします。
２ 北海道は、北海道の判断により本システムの全部又は一部の提供・運営を終了することができるものとします。北海道は、北海道の判断により本システムの全部又は一部の提供・運営を終了する場合、北海道が適当と判断する方法で利用者にその旨通知します。
３ 北海道が感染症拡大防止対策および疫学調査を行うため必要と判断する期間、本システムで収集した情報を保存します。

第５条（情報等の開示・訂正等）
１ 利用者から提供された情報について、利用者が書面による開示を希望する場合は、北海道個人情報保護条例（平成６年北海道条例第２号。以下同じ。）第１４条第１項又は第２項の規定に基づく個人情報の開示請求を行うことができます。
２ 利用者から提供された情報について、利用者が訂正、追加、削除を要望する場合は、北海道個人情報保護条例第２８条第１項又は同条第２項において準用する同条例第１４条第２項の規定により、個人情報の訂正を請求することができます。

第６条（免責事項）
本システムの利用に際して、北海道の責めに帰すべき事由によらない場合、利用者が被った損害について、一切賠償の責任を負いません。

第７条（規約改訂）
北海道は、本規約の内容を変更又は追加できるものとします。本規約を変更した場合、北海道が適当と判断する方法で利用者にその旨通知いたします。
</pre>
      </p>
      <div class="margin">
        <VCheckbox v-model="isCheckedPolicy" name="policy">
          利用規約に同意する
        </VCheckbox>
      </div>
      <ActionButton
        size="L"
        class="linkBtn"
        :theme="btnTheme"
        :is-submittable="isSubmittable"
        @click="handlePolicy"
      >
        体調記録へ
      </ActionButton>
      <div class="logout">
        <a @click="logout">ログアウトしてトップに戻る</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { AuthUser } from '@/store/modules/auth.module'
import ActionButton from '@/components/ActionButton.vue'
import VCheckbox from '@/components/VCheckbox.vue'
const Auth = namespace('Auth')

@Component({
  components: {
    ActionButton,
    VCheckbox,
  },
})
export default class Login extends Vue {
  private message = ''
  private isCheckedPolicy = false

  @Auth.Action
  private acceptPolicy!: () => Promise<AuthUser>
  @Auth.Action
  private signOut!: () => void

  get isSubmittable(): boolean {
    return this.isCheckedPolicy
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  handlePolicy(): void {
    if (this.isCheckedPolicy) {
      this.acceptPolicy().then(
        () => {
          this.$router.push('/record')
        },
        (error) => {
          this.message = `ログインできませんでした。${error}`
        },
      )
    } else {
      this.message = '利用規約に同意していません。'
    }
  }
  logout(): void {
    this.signOut();
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.alert-danger {
  left: 4.27%;
  right: 4.27%;
  top: 20.07%;
  bottom: 73.22%;
  padding: 20px;
  background: #c9e3ff;
  border-radius: 10px;
}
.termsContainer {
  margin: 30px 16px;
  padding: 16px;
  background: $white;
  border-radius: 4px;
}
.margin {
  margin: 30px 0;
}
.linkBtn {
  margin-bottom: 16px;
}
.logout {
  margin-top: 30px;
  text-align: right;
  text-decoration: underline;
}
.policytext {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;  
}
</style>
