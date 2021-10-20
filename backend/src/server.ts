import { httpServer } from './app';

httpServer.listen(4000, () =>
  console.log('Server running on PORT 4000')
);