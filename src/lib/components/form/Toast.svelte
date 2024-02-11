<script lang="ts">
  export let message: App.Superforms.Message | undefined;
</script>

{#if message?.text}
  <div class="toast">
    <div
      class="alert"
      class:alert-success={message.type === 'success'}
      class:alert-error={message.type === 'error'}
    >
      <span>{message.text}</span>
    </div>
  </div>
{/if}
