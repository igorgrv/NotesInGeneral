<template>
  <section>
    <BadgeCard>
      <template v-slot:header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
    <p>{{ infoText }}</p>
    </BadgeCard>
  </section>
</template>

<script>
import BaseBadge from './BaseBadge.vue';
import BadgeCard from './BadgeCard';

export default {
  components: { BaseBadge, BadgeCard},
  props: ['fullName', 'infoText', 'role'],
};
</script>