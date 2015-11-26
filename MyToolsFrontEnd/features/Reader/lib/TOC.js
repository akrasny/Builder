var SmartEpub = SmartEpub || {};

SmartEpub.NavPoint = function (id, playOrder, navLabel, content) {
    this.id = id;
    this.playOrder = playOrder;
    this.navLabel = navLabel;
    this.content = content;
}

SmartEpub.TOC = function (tocFileContent) {
    this.tocFileContent = tocFileContent;
}
SmartEpub.TOC.prototype = function () {
    var _$xmlDoc = $($.parseXML(this.tocFileContent)),
        _docTitle,
        _navPoints = [],
        _getDocTitle = function () {
            _docTitle = _docTitle ||
            _$xmlDoc.find('docTitle').first().find('text').first().text();

            return _docTitle;
        },
        _getNavPoints = function () {
            _$xmlDoc.find('navPoint').each(function () {
                if (_navPoints.length == 0)  {
                    var id = $(this).attr('id'),
                        playOrder = $(this).attr('playOrder'),
                        navLabel = $(this).find('navLabel').first().find('text').first().text(),
                        content = $(this).find('content').first().attr('src');

                    _navPoints.push(new SmartEpub.NavPoint(id, playOrder, navLabel, content));
                }
            });

            return _navPoints.sort(function (left, right) {
                var iLeft = parseInt(left.playOrder),
                    iRight = parseInt(right.playOrder);

                if (isNaN(iLeft) || isNaN(iRight)) {
                    return 0;
                }
                return iLeft - iRight;
            });
        }

        return {
            getDocTitle: _getDocTitle,
            getNavPoints: _getNavPoints
        }
}();