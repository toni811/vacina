<body>
<ul>
    <h1>Impfanmeldung VACINA</h1>
    @foreach ($ as $vacina)
        <li>{{$vacinas->description}} {{$vacinas->title}}</li>
    @endforeach
</ul>
</body>