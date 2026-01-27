<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-vue-next'
</script>

<template>
  <div class="p-8 space-y-8">
    <section>
      <h2 class="text-2xl font-bold mb-4">Gombok (Buttons)</h2>
      <div class="flex flex-wrap gap-4">
        <Button>Alapértelmezett</Button>
        <Button variant="secondary">Másodlagos</Button>
        <Button variant="destructive">Destruktív</Button>
        <Button variant="outline">Körvonalas</Button>
        <Button variant="ghost">Szellem</Button>
        <Button variant="link">Link</Button>
        <Button>
          <Mail class="w-4 h-4 mr-2" /> Bejelentkezés e-maillel
        </Button>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Kártya (Card)</h2>
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Projekt létrehozása</CardTitle>
          <CardDescription>Hozzon létre egy új projektet egyetlen kattintással.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Kártya tartalma helye.</p>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline">Mégse</Button>
          <Button>Létrehozás</Button>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
