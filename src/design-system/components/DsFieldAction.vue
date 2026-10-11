<script lang="ts" setup>
// Place une action (ex. un bouton) dans une rangée de DsField, alignée sur le contrôle
// (input/select) et non sur le label. Le spacer reprend la classe du label : même hauteur
// et même gap que DsField, sans valeur en dur, et l'alignement reste correct si un
// message d'erreur/hint s'affiche sous un champ voisin.
</script>

<template>
  <div class="ds-field-action">
    <span aria-hidden="true" class="ds-field__label ds-field-action__spacer">&nbsp;</span>
    <slot/>
  </div>
</template>