# Movie DB app

This application lets you see the trending shows on The Movie DB (TMDB).

A search feature is also implemented.  

In both cases, results are filtered by type: Movie or TV Show.

You can also see more details for each show.

Four routes are implemented: home, search, movie and tv show.

## Keyboard Navigation

On devices that have a keyboard, the results grid can be navigated with the four 'Arrow' keys. The 'Enter' key navigates to the selected item page.

## Responsive Design

The app adapts to mobile / smaller screen devices as the grid layout is responsive.

## Technology

The app was developed with the Remix framework and TypeScript.

## Deployment

The app is live on Vercel at the address on the right.

### Notes / Improvements

Some simple tests are included (using Vitest and React Testing Library).

Initial support for pagination is also there.

-----------------------------------------------

# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
